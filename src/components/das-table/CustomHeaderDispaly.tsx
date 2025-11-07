const CustomHeaderDispaly = ({headingTop, headingBottom, headingBottomRight}:any) => {
  return (
<div style={{height:'50px', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <div className="table-header-top-label">
              {headingTop}
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <div className="table-header-lower-label">
              {headingBottom}
              </div>
              {headingBottomRight && <div className='table-header-divider'>
              </div>}
              <div className="table-header-lower-label">
              {headingBottomRight}
              </div>
            </div>
          </div>
  )
}

export default CustomHeaderDispaly;
