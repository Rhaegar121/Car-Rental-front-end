import PropTypes from 'prop-types';

function StarRating({ value }) {
  const filledStars = '★'.repeat(value);
  const emptyStars = '☆'.repeat(5 - value);

  return (
    <div className="star">
      {filledStars}
      {emptyStars}
    </div>
  );
}

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
};

export default StarRating;
