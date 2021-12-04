import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <Splash />
      <p>I'm the home page!</p>
    </>
  );
}

function Splash() {
  return (
    <div className='splash d-flex flex-column align-items-center justify-content-end'>
      <hgroup className='w-100 text-center bg-light py-1 px-2 my-auto'>
        <h1 className='display-1'>Welcome to Coffee & Comestibles!</h1>
        <h2 className='display-6'>
          Your friendly neighborhood bakery and café
        </h2>
      </hgroup>
      <a href='#start-content' className='mb-5 position-absolute'>
        <FontAwesomeIcon icon={faChevronCircleDown} className='fs-1' />
      </a>
    </div>
  );
}
