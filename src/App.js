/* eslint-disable jsx-a11y/anchor-is-valid */
import { useInfiniteQuery, useQuery } from 'react-query';
import { getGitHubData } from './services/GitHubServices';
import './App.css';
import { useEffect, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';

export default function App() {
  /**
   * INFORMATION:
   * EXAMPLE INFINITE
   */
  // const { data, error, fetchNextPage, hasNextPage, isLoading } =
  //   useInfiniteQuery(
  //     ['github-data'],
  //     (pageParam = 1) => getGitHubData(pageParam),
  //     {
  //       getNextPageParam: (lastPage, allPages) => {
  //         debugger;
  //         const maxPage = lastPage.total_count / 30; //86978 / 30 = 2899
  //         const nextPage = allPages.length + 1; // siempre q nextPage este mas pequeño que pida el proximo
  //         return nextPage <= maxPage ? nextPage : undefined;
  //       },
  //     }
  //   );

  // useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event.target.scrollingElement;
  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
  //       fetching = true;

  //       hasNextPage && (await fetchNextPage());

  //       fetching = false;
  //     }
  //   };

  //   document.addEventListener('scroll', onScroll);
  //   return () => document.removeEventListener('scroll', onScroll);
  // });

  /**
   * INFORMATION:
   * EXAMPLE NORMAL PAGINATE
   */
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ['gitHubKey', page],
    () => getGitHubData(page),
    {
      keepPreviousData: true,
    }
  );
  console.log('Data-->', data);
  console.log('Page-->', page);

  if (isLoading) {
    return (
      <div>
        <span className='spinner-border'></span> Loading Posts...
      </div>
    );
  }
  if (isError) {
    return (
      <section className='alert alert-danger'>
        Error fetching posts: {error.message}
      </section>
    );
  }
  return (
    <main className='container'>
      <h1 className='mb-4'>GitHub data</h1>

      {data.items.map((data) => (
        <div key={data.id} className='github-box'>
          <strong>{data.name}</strong>
          <p>{data.description}</p>
        </div>
      ))}
      <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        Previous Page
      </button>
      <button
        disabled={isPreviousData}
        onClick={() => setPage((old) => old + 1)}
      >
        Next Page
      </button>
    </main>
  );
}

// Testing Queries and Mutation
{
  /* <main className="container">
      <h1 className="mb-4">React-Query Demo</h1>
      {postId > -1 && (
        <div>
          <a onClick={() => setPostId(-1)} href="#">
            Back
          </a>
        </div>
      )}
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <div className="row gap-4">
          <div className="col-md">
            <NewPost />
          </div>
          <div className="col-md">
            <Posts setPostId={setPostId} />
          </div>
        </div>
      )}
    </main> */
}
