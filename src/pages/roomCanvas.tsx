import React, { useRef, useEffect, useState, MouseEvent, WheelEvent } from 'react';

interface CanvasElement {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'rectangle' | 'image';
    color?: string;
    imageData?: string;
}

const RoomCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [elements, setElements] = useState<CanvasElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Setup canvas on mount and when elements change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 600;

        // Clear and redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw all elements
        elements.forEach(element => {
            // Draw selection outline if element is selected
            if (selectedElement?.id === element.id) {
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4);
            }

            // Draw the element
            if (element.type === 'rectangle') {
                ctx.fillStyle = element.color || '#000';
                ctx.fillRect(element.x, element.y, element.width, element.height);
            } else if (element.type === 'image' && element.imageData) {
                const img = new Image();
                img.src = element.imageData;
                img.onload = () => {
                    ctx.drawImage(img, element.x, element.y, element.width, element.height);
                };
            }
        });
    }, [elements, selectedElement]);

    // Add Rectangle function
    const addRectangle = () => {
        const newElement: CanvasElement = {
            id: Date.now(),
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            type: 'rectangle',
            color: '#FF5722',
        };
        setElements(prev => [...prev, newElement]);
    };

    // Handle Image Upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const maxWidth = 200;
                const width = maxWidth;
                const height = maxWidth / aspectRatio;

                const newElement: CanvasElement = {
                    id: Date.now(),
                    x: 100,
                    y: 100,
                    width,
                    height,
                    type: 'image',
                    imageData: e.target?.result as string,
                };
                setElements(prev => [...prev, newElement]);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    // Select Element
    const selectElement = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Check elements in reverse order (top to bottom)
        let found = false;
        for (let i = elements.length - 1; i >= 0; i--) {
            const el = elements[i];
            if (
                mouseX > el.x &&
                mouseX < el.x + el.width &&
                mouseY > el.y &&
                mouseY < el.y + el.height
            ) {
                setSelectedElement(el);
                setIsDragging(true);
                setDragOffset({
                    x: mouseX - el.x,
                    y: mouseY - el.y
                });
                found = true;
                break;
            }
        }

        if (!found) {
            setSelectedElement(null);
        }
    };

    // Handle Dragging
    const handleDrag = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !selectedElement) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setElements(prevElements =>
            prevElements.map(el =>
                el.id === selectedElement.id
                    ? {
                          ...el,
                          x: mouseX - dragOffset.x,
                          y: mouseY - dragOffset.y,
                      }
                    : el
            )
        );
    };

    // Handle Zoom with Mouse Wheel
    const handleWheel = (e: WheelEvent<HTMLCanvasElement>) => {
        if (!selectedElement || !e.shiftKey) return;

        e.preventDefault();
        const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05;

        setElements(prevElements =>
            prevElements.map(el => {
                if (el.id === selectedElement.id) {
                    const centerX = el.x + el.width / 2;
                    const centerY = el.y + el.height / 2;
                    const newWidth = el.width * scaleFactor;
                    const newHeight = el.height * scaleFactor;
                    
                    return {
                        ...el,
                        width: newWidth,
                        height: newHeight,
                        x: centerX - newWidth / 2,
                        y: centerY - newHeight / 2
                    };
                }
                return el;
            })
        );
    };

    // Stop Dragging
    const stopDragging = () => {
        setIsDragging(false);
    };

    // Delete Selected Element
    const deleteSelected = () => {
        if (selectedElement) {
            setElements(prevElements =>
                prevElements.filter(el => el.id !== selectedElement.id)
            );
            setSelectedElement(null);
        }
    };

    // Handle keyboard delete
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedElement && (e.key === 'Delete' || e.key === 'Backspace')) {
                deleteSelected();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedElement]);

    return (
        <div className="p-4">
            <div className="mb-4 space-x-2">
                <button 
                    onClick={addRectangle} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Rectangle
                </button>
                <label className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
                    Add Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
                {selectedElement && (
                    <button
                        onClick={deleteSelected}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete Selected
                    </button>
                )}
            </div>
            <div className="text-sm text-gray-600 mb-2">
                Hold Shift + Mouse Wheel to zoom in/out on selected element
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={selectElement}
                onMouseMove={handleDrag}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onWheel={handleWheel}
                className="border border-gray-300 rounded"
            ></canvas>
        </div>
    );
};

export default RoomCanvas;