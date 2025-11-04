import { gridColumnPositionsSelector, gridColumnsTotalWidthSelector, useGridApiContext } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Box, Skeleton, styled } from "@mui/material";
import { getInitialRowCount } from "../../utils/helper";

const SkeletonCell = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`
}));

function SkeletonLoadingOverlay() {
    const apiRef = useGridApiContext();

    const dimensions = apiRef.current?.getRootDimensions();
    const viewportHeight = dimensions?.viewportInnerSize.height ?? 0;

    const rowHeight = 40;
    const skeletonRowsCount = Math.ceil(viewportHeight / rowHeight);

    const totalWidth = gridColumnsTotalWidthSelector(apiRef);
    const positions = gridColumnPositionsSelector(apiRef);
    const inViewportCount = useMemo(
        () => positions.filter((value) => value <= totalWidth).length,
        [totalWidth, positions]
    );
    const columns = apiRef.current.getVisibleColumns().slice(0, inViewportCount);

    const children = useMemo(() => {
        // reseed random number generator to create stable lines betwen renders
        const random = randomBetween(12345, 25, 75);
        const array: any = [];

        for (let i = 0; i < skeletonRowsCount; i += 1) {
            for (const column of columns) {
                const width = Math.round(random());
                array.push(
                    <SkeletonCell
                        key={`column-${i}-${column.field}`}
                        sx={{ justifyContent: column.align }}
                    >
                        <Skeleton sx={{ mx: 1 }} width={`${width}%`} />
                    </SkeletonCell>
                );
            }
            array.push(<SkeletonCell key={`fill-${i}`} />);
        }
        return array;
    }, [skeletonRowsCount, columns]);

    const screenHeightOtherThanTableHeight = 250;
    const initialRowCount = useMemo(() => getInitialRowCount(screenHeightOtherThanTableHeight), [screenHeightOtherThanTableHeight]);

    const defaultColumns = Array.from({ length: initialRowCount }, (_, i) => {
        return {
            field: `field${i}`,
        };
    });
    const defaultChildren = useMemo(() => {
        // reseed random number generator to create stable lines betwen renders
        const random = randomBetween(12345, 25, 75);
        const array: any = [];

        for (let i = 0; i < 10; i += 1) {
            for (const column of defaultColumns) {
                const width = Math.round(random());
                array.push(
                    <SkeletonCell
                        key={`column-${i}-${column.field}`}
                        sx={{ justifyContent: "left" }}
                    >
                        <Skeleton sx={{ mx: 1 }} width={`${width}%`} />
                    </SkeletonCell>
                );
            }
            array.push(<SkeletonCell key={`fill-${i}`} />);
        }
        return array;
    }, [skeletonRowsCount, columns]);

    const rowsCount = apiRef.current.getRowsCount();

    return rowsCount === 0 ? (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `${columns
                        .map(({ computedWidth }) => `${computedWidth}px`)
                        .join(" ")} 1fr`,
                    gridAutoRows: rowHeight
                }}
            >
                {defaultChildren}
            </div>

        </>
    ) : (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `${columns
                    .map(({ computedWidth }) => `${computedWidth}px`)
                    .join(" ")} 1fr`,
                gridAutoRows: rowHeight
            }}
        >
            {children}
        </div>
    );
}

export default SkeletonLoadingOverlay;


function mulberry32(a: number): () => number {
    return () => {
        /* eslint-disable */
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        /* eslint-enable */
    };
}

function randomBetween(seed: number, min: number, max: number): () => number {
    const random = mulberry32(seed);
    return () => min + (max - min) * random();
}
