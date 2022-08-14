import { Link } from 'react-router-dom';

const Public = () => {
  const content = (
    <section className='public'>
      <header>
        <h1>
          Welcome to <span className='nowrap'>Rithu Repairs!</span>
        </h1>
      </header>
      <main className='public__main'>
        <p>
          Located in Beautiful Aachen City, Rithu Repairs provides a trained
          staff ready to meet your tech repair needs.
        </p>
        <address className='public__addr'>
          Rithu Repairs
          <br />
          Aachen
          <br />
          60000, Aachen West
          <br />
          <a href='tel:+15555555555'>(049) 555-5555</a>
        </address>
        <br />
        <p>Owner: Rithu P.</p>
      </main>
      <footer>
        <Link to='/login'>Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
