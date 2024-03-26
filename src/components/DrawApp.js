import React, { useRef, useState } from 'react';
import './DrawApp.css';
import brushIcon from './icons/brush.svg';
import eraserIcon from './icons/eraser.svg';


const DrawingApp = ({ onExportToEditor }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [isErasing, setIsErasing] = useState(false);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setIsDrawing(true);
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        ctx.lineTo(x, y);
        ctx.strokeStyle = isErasing ? 'white' : brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const changeBrushColor = (color) => {
        setBrushColor(color);
        setIsErasing(false);
    };

    const changeBrushSize = (size) => {
        setBrushSize(size);
    };

    const selectBrush = () => {
        setIsErasing(false);
    };

    const selectEraser = () => {
        setIsErasing(true);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const returnToEditor = () => {
        window.history.back();
    };

    const exportToEditor = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        onExportToEditor(dataURL);
        window.history.back();
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                onMouseOut={finishDrawing}
            />
            <div className="toolbar">
                <div>
                    <label htmlFor="color-picker">Color:</label>
                    <input
                        type="color"
                        id="color-picker"
                        value={brushColor}
                        onChange={(e) => changeBrushColor(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="brush-size">Brush Size:</label>
                    <input
                        type="range"
                        id="brush-size"
                        min="1"
                        max="20"
                        value={brushSize}
                        onChange={(e) => changeBrushSize(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <button onClick={selectBrush} className={!isErasing ? 'selected' : ''}>
                        <img src={brushIcon} alt="Brush" />
                    </button>
                    <button onClick={selectEraser} className={isErasing ? 'selected' : ''}>
                        <img src={eraserIcon} alt="Eraser" />
                    </button>
                </div>
            </div>
            <div className="additional-buttons">
                <button onClick={clearCanvas}>Clear Canvas</button>
                <button onClick={returnToEditor}>Return to Editor</button>
                <button onClick={exportToEditor}>Export to Editor</button>
            </div>
        </div>
    );
};

export default DrawingApp;
