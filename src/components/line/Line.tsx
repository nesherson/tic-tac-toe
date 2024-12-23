import { useEffect } from "react";
import "./line.css";

type LineCoordinates = {
    xStart: number;
    yStart: number;
    xEnd: number;
    yEnd: number;
}

interface Props {
    location: string|null,
    containerElementWidth: number,
    containerElementHeight: number
}

function calculateCoordinates(location: string|null, containerElementWidth: number, containerElementHeight: number) {
    const offset = 30;
    const coordinates: LineCoordinates = {
        xStart: 0,
        yStart: 0,
        xEnd: 0,
        yEnd: 0,
    }

    switch (location) {
        case "first-col": {
            const width = (containerElementWidth / 2.939238838493893) * 0.5;
            coordinates.xStart = width;
            coordinates.yStart = offset;
            coordinates.xEnd = width;
            coordinates.yEnd = containerElementWidth - offset;
            break;
        }
        case "second-col": {
            const width = (containerElementWidth / 2.939238838493893) * 0.5;
            coordinates.xStart = width * 3;
            coordinates.yStart = offset;
            coordinates.xEnd = width * 3;
            coordinates.yEnd = containerElementWidth - offset;
            break;
        }
        case "third-col": {
            const width = (containerElementWidth / 2.939238838493893) * 0.5;
            coordinates.xStart = width * 5;
            coordinates.yStart = offset;
            coordinates.xEnd = width * 5;
            coordinates.yEnd = containerElementWidth - offset;
            break;
        }
        case "first-row": {
            const height = (containerElementHeight / 2.939238838493893) * 0.5;
            coordinates.xStart = offset;
            coordinates.yStart = height;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = height;
            break;
        }
        case "second-row": {
            const height = (containerElementHeight / 2.939238838493893) * 0.5;
            coordinates.xStart = offset;
            coordinates.yStart = height * 3;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = height * 3;
            break;
        }
        case "third-row": {
            const height = (containerElementHeight / 2.939238838493893) * 0.5;
            coordinates.xStart = offset;
            coordinates.yStart = height * 5;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = height * 5;
            break;
        }
        case "left-to-right-diagonal": {
            coordinates.xStart = offset;
            coordinates.yStart = offset;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = containerElementHeight - offset;
            break;
        }
        case "right-to-left-diagonal": {
            coordinates.xStart = containerElementWidth - offset;
            coordinates.yStart = offset;
            coordinates.xEnd = offset;
            coordinates.yEnd = containerElementHeight - offset;
            break;
        }
    }

    return coordinates;
}

export default function Line({ location, containerElementWidth, containerElementHeight }: Props) {
    const coordinates = calculateCoordinates(location, containerElementWidth, containerElementHeight);

    // useEffect(() => {
    //     console.log(containerElementWidth);
    // }, [containerElementWidth]);

    return (
        <svg
            className="line-svg"
            height={containerElementWidth}
            width={containerElementHeight}
            xmlns="http://www.w3.org/2000/svg">
            <line
                className="st0"
                x1={coordinates.xStart}
                y1={coordinates.yStart}
                x2={coordinates.xEnd}
                y2={coordinates.yEnd}
                strokeWidth={8} />
        </svg>
    );
}
