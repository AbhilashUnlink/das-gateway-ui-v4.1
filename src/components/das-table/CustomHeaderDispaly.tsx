const CustomHeaderDispaly = ({headingTop, headingBottom, headingBottomRight}:any) => {
  return (
<div style={{height:'40px', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', whiteSpace:'normal'}}>
            <div className="table-header-top-label" style={{height:"20px"}}>
              {headingTop}
            </div>
            <div style={{ display: "flex", gap: "5px", height:'20px' }}>
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
