import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import { formatDate } from '../../utils/formatDate';

import Header from '../../components/Header';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
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

interface NavigationPost {
  uid: string | null;
  title: string | null;
}

interface Navigation {
  afterPost: NavigationPost;
  beforePost: NavigationPost;
}

interface PostProps {
  post: Post;
  navigation: Navigation;
  preview: boolean;
}

export default function Post({
  post,
  navigation,
  preview,
}: PostProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('comments');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('repo', process.env.UTTERANCES_REPO);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', '[Comments]');
    script.setAttribute('theme', 'photon-dark');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    anchor.appendChild(script);
  }, []);

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
              <time>{formatDate(post.first_publication_date)}</time>
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

          {post.first_publication_date !== post.last_publication_date && (
            <aside>
              <span>
                * editado em {formatDate(post.last_publication_date)}, às 15:49
              </span>
            </aside>
          )}

          <div className={styles.postContent}>
            {post.data.content.map(content => (
              <section key={content.heading.replace(' ', '-')}>
                <h2>{content.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </section>
            ))}
          </div>
        </article>

        <footer className={styles.footerContainer}>
          {!preview && (
            <div className={styles.postNavigation}>
              <div>
                {navigation.beforePost && (
                  <Link href={`/post/${navigation.beforePost.uid}`}>
                    <a>
                      <span>{navigation.beforePost.title}</span>
                      <strong>Post anterior</strong>
                    </a>
                  </Link>
                )}
              </div>

              <div>
                {navigation.afterPost && (
                  <Link href={`/post/${navigation.afterPost.uid}`}>
                    <a>
                      <span>{navigation.afterPost.title}</span>
                      <strong>Próximo post</strong>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}

          <div id="comments" />

          {preview && (
            <Link href="/api/exit-preview">
              <a>Sair do modo Preview</a>
            </Link>
          )}
        </footer>
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

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  });

  let navigation = {};
  if (!preview) {
    const { results: afterPost } = await prismic.query([
      Prismic.Predicates.at('document.type', 'posts'),
      Prismic.Predicates.date.after(
        'document.first_publication_date',
        response.first_publication_date
      ),
    ]);

    const { results: beforePost } = await prismic.query([
      Prismic.Predicates.at('document.type', 'posts'),
      Prismic.Predicates.dateBefore(
        'document.first_publication_date',
        response.first_publication_date
      ),
    ]);

    navigation = {
      afterPost: afterPost[0]
        ? {
            uid: afterPost[afterPost.length - 1].uid,
            title: afterPost[afterPost.length - 1].data.title,
          }
        : null,
      beforePost: beforePost[0]
        ? {
            uid: beforePost[0].uid,
            title: beforePost[0].data.title,
          }
        : null,
    };
  }

  return {
    props: {
      post: response,
      navigation,
      preview,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
