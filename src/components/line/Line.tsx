import { Measures } from "@react-hookz/web";
import "./line.css";

type LineCoordinates = {
    xStart: number;
    yStart: number;
    xEnd: number;
    yEnd: number;
    bgXStart: number;
    bgYStart: number;
    bgXEnd: number;
    bgYEnd: number;
    bgStrokeWidth: number;
}

interface Props {
    location: string | null,
    gameContainerMeasures: Measures
}

function calculateCoordinates(location: string | null,
    containerElementWidth: number,
    containerElementHeight: number,
    strokeWidth: number) {
    let offset = 0;
    const coordinates: LineCoordinates = {
        xStart: 0,
        yStart: 0,
        xEnd: 0,
        yEnd: 0,
        bgXStart: 0,
        bgYStart: 0,
        bgXEnd: 0,
        bgYEnd: 0,
        bgStrokeWidth: 0
    }

    coordinates.bgStrokeWidth = strokeWidth * 1.95;

    switch (location) {
        case "first-col": {
            offset = containerElementHeight * 0.03;
            const width = (containerElementWidth / 3) * 0.5;
            coordinates.xStart = width;
            coordinates.yStart = offset;
            coordinates.xEnd = width;
            coordinates.yEnd = containerElementWidth - offset;
            coordinates.bgXStart = coordinates.xStart;
            coordinates.bgYStart = coordinates.yStart - 10;
            coordinates.bgXEnd = coordinates.xEnd;
            coordinates.bgYEnd = coordinates.yEnd + 10;
            break;
        }
        case "second-col": {
            offset = containerElementHeight * 0.03;
            const width = (containerElementWidth / 3) * 0.5;
            coordinates.xStart = width * 3;
            coordinates.yStart = offset;
            coordinates.xEnd = width * 3;
            coordinates.yEnd = containerElementWidth - offset;
            coordinates.bgXStart = coordinates.xStart;
            coordinates.bgYStart = coordinates.yStart - 10;
            coordinates.bgXEnd = coordinates.xEnd;
            coordinates.bgYEnd = coordinates.yEnd + 10;
            break;
        }
        case "third-col": {
            offset = containerElementHeight * 0.03;
            const width = (containerElementWidth / 3) * 0.5;
            coordinates.xStart = width * 5;
            coordinates.yStart = offset;
            coordinates.xEnd = width * 5;
            coordinates.yEnd = containerElementWidth - offset;
            coordinates.bgXStart = coordinates.xStart;
            coordinates.bgYStart = coordinates.yStart - 10;
            coordinates.bgXEnd = coordinates.xEnd;
            coordinates.bgYEnd = coordinates.yEnd + 10;
            break;
        }
        case "first-row": {
            offset = containerElementWidth * 0.03;
            const height = (containerElementHeight / 3) * 0.5;
            coordinates.xStart = offset;
            coordinates.yStart = height;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = height;
            coordinates.bgXStart = coordinates.xStart - 10;
            coordinates.bgYStart = coordinates.yStart;
            coordinates.bgXEnd = coordinates.xEnd + 10;
            coordinates.bgYEnd = coordinates.yEnd;
            break;
        }
        case "second-row": {
            offset = containerElementWidth * 0.03;
            const height = (containerElementHeight / 3) * 0.5;
            coordinates.xStart = offset;
            coordinates.yStart = height * 3;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = height * 3;
            coordinates.bgXStart = coordinates.xStart - 10;
            coordinates.bgYStart = coordinates.yStart;
            coordinates.bgXEnd = coordinates.xEnd + 10;
            coordinates.bgYEnd = coordinates.yEnd;
            break;
        }
        case "third-row": {
            offset = containerElementWidth * 0.03;
            const height = (containerElementHeight / 3) * 0.5;
            coordinates.xStart = offset;
            coordinates.yStart = height * 5;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = height * 5;
            coordinates.bgXStart = coordinates.xStart - 10;
            coordinates.bgYStart = coordinates.yStart;
            coordinates.bgXEnd = coordinates.xEnd + 10;
            coordinates.bgYEnd = coordinates.yEnd;
            break;
        }
        case "left-to-right-diagonal": {
            offset = containerElementHeight + containerElementWidth / 2 * 0.03;
            coordinates.xStart = offset;
            coordinates.yStart = offset;
            coordinates.xEnd = containerElementWidth - offset;
            coordinates.yEnd = containerElementHeight - offset;
            coordinates.bgXStart = coordinates.xStart - 10;
            coordinates.bgYStart = coordinates.yStart - 10;
            coordinates.bgXEnd = coordinates.xEnd + 10;
            coordinates.bgYEnd = coordinates.yEnd + 10;
            break;
        }
        case "right-to-left-diagonal": {
            offset = containerElementHeight + containerElementWidth / 2 * 0.03;
            coordinates.xStart = containerElementWidth - offset;
            coordinates.yStart = offset;
            coordinates.xEnd = offset;
            coordinates.yEnd = containerElementHeight - offset;
            coordinates.bgXStart = coordinates.xStart + 10;
            coordinates.bgYStart = coordinates.yStart - 10;
            coordinates.bgXEnd = coordinates.xEnd - 10;
            coordinates.bgYEnd = coordinates.yEnd + 10;
            break;
        }
    }

    return coordinates;
}

export default function Line({ location, gameContainerMeasures }: Props) {
    const strokeWidth = 20;
    const coordinates = calculateCoordinates(location,
        gameContainerMeasures.width,
        gameContainerMeasures.height,
        strokeWidth);

    return (
        <svg
            className="line-svg"
            height={gameContainerMeasures.height}
            width={gameContainerMeasures.width}
            xmlns="http://www.w3.org/2000/svg">
            <line
                className="bg-line"
                x1={coordinates.bgXStart}
                y1={coordinates.bgYStart}
                x2={coordinates.bgXEnd}
                y2={coordinates.bgYEnd}
                strokeWidth={coordinates.bgStrokeWidth}
                stroke="#242424" />
            <line
                className="line"
                x1={coordinates.xStart}
                y1={coordinates.yStart}
                x2={coordinates.xEnd}
                y2={coordinates.yEnd}
                strokeWidth={strokeWidth}
                stroke="#d9d9d9" />
        </svg>
    );
}
