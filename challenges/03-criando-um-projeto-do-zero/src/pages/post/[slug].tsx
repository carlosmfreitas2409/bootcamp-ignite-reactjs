import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useEffect } from 'react';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import Header from '../../components/Header';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  const totalContentWords = post.data.content.reduce((totalWords, content) => {
    const headingLetters = content.heading.split(' ').length;
    const bodyLetters = content.body.reduce((totalBodyWords, body) => {
      return totalBodyWords + body.text.split(' ').length;
    }, 0);

    return totalWords + headingLetters + bodyLetters;
  }, 0);

  return router.isFallback ? (
    <div>Carregando...</div>
  ) : (
    <>
      <Head>
        <title>{post.data.title} | SpaceTraveling</title>
      </Head>

      <Header />

      <img
        src={post.data.banner.url}
        alt="banner"
        className={styles.postBanner}
      />

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>

          <section className={styles.infoContainer}>
            <div>
              <FiCalendar size={20} color="#BBBBBB" />
              <time>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </time>
            </div>

            <div>
              <FiUser size={20} color="#BBBBBB" />
              <span>{post.data.author}</span>
            </div>

            <div>
              <FiClock size={20} color="#BBBBBB" />
              <span>{Math.ceil(totalContentWords / 200)} min</span>
            </div>
          </section>

          <div className={styles.postContent}>
            {post.data.content.map(content => (
              <section key={content.heading.replace(' ', '-')}>
                <h2>{content.heading}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );

  return {
    fallback: true,
    paths: posts.results.map(post => ({
      params: { slug: post.uid },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
