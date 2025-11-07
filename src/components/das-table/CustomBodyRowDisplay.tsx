const CustomBodyRowDisplay = ({rowTopValue, rowBottomValue, rowTopClassName, rowBottomClassName}:any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "50px",
        justifyContent: "center",
      }}
    >
      <div className={`table-header-top-label value date-value ${rowTopClassName}`}>{rowTopValue}</div>
      <div className={`row-bottom-value ${rowBottomClassName}`}>{rowBottomValue}</div>
    </div>
  )
}

export default CustomBodyRowDisplay
