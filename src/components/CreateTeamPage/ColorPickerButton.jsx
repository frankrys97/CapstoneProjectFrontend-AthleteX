import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Importa PropTypes

const ColorPickerButton = ({ color, onChangeComplete }) => {
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleColorChange = (newColor) => {
        onChangeComplete(newColor);
        setShowPicker(false);  
    };

    const popover = (
        <Popover id="color-picker-popover">
            <Popover.Body>
                <ChromePicker color={color} onChangeComplete={handleColorChange} />
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="color-picker-button mb-3">
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} show={showPicker} rootClose onToggle={togglePicker}>
                <Button 
                    variant="outline-secondary" 
                    className="color-display-button" 
                    style={{ backgroundColor: color, width: '20px', height: '20px', padding: 0, borderRadius: '4px' }}
                />
            </OverlayTrigger>
        </div>
    );
};

ColorPickerButton.propTypes = {
    color: PropTypes.string.isRequired,
    onChangeComplete: PropTypes.func.isRequired
};

export default ColorPickerButton;