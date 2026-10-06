import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://default:Anant2911@cluster0.onvfyiw.mongodb.net/?appName=Cluster0",
  );
  const db = client.db("meetups");
  const meetupCollection = db.collection("meetups");
  const meetupIds = await meetupCollection.find().toArray();
  console.log(meetupIds);
  client.close();
  return {
    fallback: false, // tells next to generate a 404 page for not defined pages here
    paths: meetupIds.map((meetup) => ({
      params: {
        meetId: meetup._id.toString(),
      },
    })),
    // this array contains which pages are allowed to show
    // [{
    //   params: {
    //     meetId: "m1",
    //   },
    // },
    // {
    //   params: {
    //     meetId: "m2",
    //   },
    // },
    // ],
  };
}

export async function getStaticProps(context) {
  const { meetId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://default:Anant2911@cluster0.onvfyiw.mongodb.net/?appName=Cluster0",
  );
  const db = client.db("meetups");
  const meetupCollection = db.collection("meetups");
  const meetupId = new ObjectId(meetId);
  const selectedMeetup = await meetupCollection.findOne({ _id: meetupId });
  console.log(selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        _id: selectedMeetup._id.toString(),
      },
    },
  };
}
