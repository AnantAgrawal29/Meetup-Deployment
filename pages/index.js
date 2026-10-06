import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
// use when data changes frequently
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//       // don't need to use revalidate as it relaods for every http request
//       // as it is on server
//     },
//   };
// }

// all code here in this function executes on server side
// this function is automatically executed by react/next first
// used for loading data and waiting for http requets

// static generation
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://default:Anant2911@cluster0.onvfyiw.mongodb.net/?appName=Cluster0",
  );
  const db = client.db("meetups");
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // this page is regenerated for every 1 second on build and on server
  };
}
