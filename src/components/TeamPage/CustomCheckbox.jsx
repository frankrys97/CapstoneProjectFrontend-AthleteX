import "./CustomCheckbox.scss";
import PropTypes from 'prop-types';

const CustomCheckbox = ({
  id,
  checked,
  onChange,
  label,
  boxClassName ,
  tickClassName 
}) => {
  return (
    <div className="checkbox-wrapper me-2">
      <input
        id={id}
        name="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="terms-label d-flex align-items-center gap-1" htmlFor={id}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          className="checkbox-svg"
        >
          <mask fill="white" id={`path-1-inside-1_${id}`}>
            <rect height="200" width="200"></rect>
          </mask>
          <rect
            mask={`url(#path-1-inside-1_${id})`}
            strokeWidth="40"
            className={boxClassName}
            height="200"
            width="200"
          ></rect>
          <path
            strokeWidth="15"
            d="M52 111.018L76.9867 136L149 64"
            className={tickClassName}
          ></path>
        </svg>
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};


CustomCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  boxClassName: PropTypes.string,
  tickClassName: PropTypes.string,
};



export default CustomCheckbox;
