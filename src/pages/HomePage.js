//This is the home page

//Version 2 with styled components
import StartingPageContent from '../components/StartingPage/StartingPageContent';
import Accordion from '../components/Accordion';

const HomePage = (props) => {
  return (
    <div>
      <StartingPageContent />
      <Accordion data={props.data}></Accordion>
    </div>
  );
};

export default HomePage;


//Original:
// import StartingPageContent from '../components/StartingPage/StartingPageContent';

// const HomePage = () => {
//   return <StartingPageContent />;
// };

// export default HomePage;