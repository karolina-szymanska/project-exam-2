import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";

const AboutPage = () => {
  return (
    <div className="mx-auto mb-6 max-w-screen-md">
      <h1 className="mt-4 text-center text-2xl font-bold uppercase text-blue-700 md:mt-12">
        About
      </h1>
      <div className="mx-5 sm:p-2">
        <div className="py-4">
          <p className="mb-3">
            Welcome to Holidaze, your ultimate destination for hassle-free
            travel booking and unforgettable experiences!
          </p>
          <p className="mb-3">
            At Holidaze, we believe that every journey should be filled with
            excitement, relaxation, and discovery. That's why we're dedicated to
            providing our customers with the easiest, most enjoyable booking
            experience possible. Whether you're planning a spontaneous getaway
            or a meticulously planned vacation, Holidaze is here to make it
            happen.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={about1}
            alt="a person pointing at a camera, nearby macbook"
            style={{ width: "100%", height: "300px" }}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="py-4">
          <div className="mb-3">
            <p className="text-lg font-semibold text-blue-700">
              Discover New Destinations
            </p>
            <p>
              With Holidaze, explore a diverse range of destinations, from
              serene beach resorts to picturesque countryside getaways. Our
              carefully curated accommodations ensure you find the perfect spot
              for your next adventure.
            </p>
          </div>
          <div className="mb-3">
            <p className="text-lg font-semibold text-blue-700">
              Seamless Booking
            </p>
            <p>
              Booking your dream vacation is a breeze with Holidaze. Our
              intuitive platform lets you effortlessly browse, compare, and book
              accommodations in just a few clicks. Say goodbye to complex
              booking processes – at Holidaze, it's smooth sailing all the way.
            </p>
          </div>
          <div className="mb-3">
            <p className="text-lg font-semibold text-blue-700">
              Unforgettable Experiences
            </p>
            <p>
              Travel is about creating lasting memories, and at Holidaze, we're
              dedicated to making every moment count. From luxurious amenities
              to personalized recommendations, we ensure every aspect of your
              trip is perfect.
            </p>
          </div>
          <div className="mb-3">
            <p className="text-lg font-semibold text-blue-700">
              Your Adventure Awaits
            </p>
            <p>
              Whether you seek a beach escape, city thrill, or cultural
              immersion, Holidaze has it all. Pack your bags, hit the road, and
              let Holidaze be your companion on the journey of a lifetime.
            </p>
          </div>
        </div>

        <div>
          <img
            src={about2}
            alt="A smiling woman sitting on a boat, spreading her arms upwards"
            style={{ width: "100%", height: "300px" }}
            className="rounded-lg object-cover"
          />
        </div>

        <p className="py-4">
          At Holidaze, we're more than just a booking site – we're your trusted
          partner in travel, dedicated to making your vacation dreams a reality.
          Join us and discover a world of endless possibilities. Let's make
          every day a holiday with Holidaze.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
