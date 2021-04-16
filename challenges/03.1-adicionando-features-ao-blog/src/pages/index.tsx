import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import { formatDate } from '../utils/formatDate';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);

  function handleLoadMorePosts(): void {
    fetch(postsPagination.next_page)
      .then(response => response.json())
      .then(data => setPosts(data.results));
  }

  return (
    <>
      <Head>
        <title>Início | SpaceTraveling</title>
      </Head>

      <main className={styles.contentContainer}>
        <header>
          <img src="/logo.svg" alt="logo" />
        </header>

        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <h2>{post.data.title}</h2>
                <p>{post.data.subtitle}</p>
                <section>
                  <div>
                    <FiCalendar size={20} color="#BBBBBB" />
                    <time>{formatDate(post.first_publication_date)}</time>
                  </div>

                  <div>
                    <FiUser size={20} color="#BBBBBB" />
                    <span>{post.data.author}</span>
                  </div>
                </section>
              </a>
            </Link>
          ))}

          {postsPagination.next_page && (
            <button type="button" onClick={handleLoadMorePosts}>
              Carregar mais posts
            </button>
          )}
        </div>

        {preview && (
          <footer>
            <Link href="/api/exit-preview">
              <a>Sair do modo Preview</a>
            </Link>
          </footer>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 20,
      ref: previewData?.ref ?? null,
    }
  );

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postsResponse.results,
      },
      preview,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
