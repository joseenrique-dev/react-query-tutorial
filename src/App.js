/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from 'react-query';
import { getGitHubData } from './services/GitHubServices';
import './App.css';
import { useEffect } from 'react';
import { type } from '@testing-library/user-event/dist/type';

export default function App() {
  const { data, isLoading, error } = useQuery(['github-data'], getGitHubData);

  useEffect(() => {
    const onScroll = (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        console.log('Contact');
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  });

  if (isLoading) {
    return (
      <div>
        <span className='spinner-border'></span> Loading Posts...
      </div>
    );
  }
  if (error) {
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
