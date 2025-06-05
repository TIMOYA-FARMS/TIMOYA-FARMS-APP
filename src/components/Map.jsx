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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.796799759824!2d-0.2011212846830943!3d5.547079395972612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe31a3cf2e62fd0b%3A0xf31e4e40a63b8d68!2sBlack%20Star%20Square!5e0!3m2!1sen!2sgh!4v1684576985290!5m2!1sen!2sgh"
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
