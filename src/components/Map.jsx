import React from 'react';

const Map = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31461.471009558838!2d0.2887340537024652!3d9.707998481928078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102a42c21a73cb35%3A0x75f2cd94a72e2757!2sSaboba!5e0!3m2!1sen!2sgh!4v1758634571650!5m2!1sen!2sgh"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Black Star Square Map"
      ></iframe>
    </div>
  );
};

export default Map;
