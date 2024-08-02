import { useState, useEffect } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { HexColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';

const ColorPickerButton = ({ color, onColorChange }) => {
    const [currentColor, setCurrentColor] = useState(color || '#000000'); // Colore di fallback

    useEffect(() => {
        if (color) {
            setCurrentColor(color);  // Sincronizza il colore con la prop se definito
        }
    }, [color]);

    const handleColorChange = (newColor) => {
        setCurrentColor(newColor);
        onColorChange(newColor);  // Comunica il nuovo colore al genitore
    };

    const popover = (
        <Popover id="color-picker-popover">
            <Popover.Body>
                <HexColorPicker color={currentColor} onChange={handleColorChange} />
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="color-picker-button">
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                rootClose
            >
                <Button 
                    variant="outline-secondary" 
                    className="color-display-button" 
                    style={{ backgroundColor: currentColor, width: '20px', height: '20px', padding: 0, borderRadius: '4px' }}
                />
            </OverlayTrigger>
        </div>
    );
};

ColorPickerButton.propTypes = {
    color: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired
};

export default ColorPickerButton;
