// import React from "react";

// const Appointments = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <a
//         href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1k7clLGSEgdcEeNg7kDawGP0ThbuPyeoIwt2-M-xNjleC4XaIj_6Dvuw1kyPRRKmroQOPK6H27"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Open Google Calendar
//       </a>
//     </div>
//   );
// };

// export default Appointments;


import React from "react";

const Appointments = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1k7clLGSEgdcEeNg7kDawGP0ThbuPyeoIwt2-M-xNjleC4XaIj_6Dvuw1kyPRRKmroQOPK6H27"
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
};

export default Appointments;
