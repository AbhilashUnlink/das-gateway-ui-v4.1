// import { Done } from "@mui/icons-material";
// import { Button } from "@mui/material";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PreferenceList = ({ columnsWithAccess,unChecked,setUnChecked,selectedList, updatedList=[],setUpdatedList}: any) => {
  
  const { t } = useTranslation();
  const [items, setItems] = useState<any>([]);
  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(
    null,
  );
  const handleDragStart = (index: number) => {
    setDraggingItemIndex(index);
  };
  const handleDragOver = (index: number) => {
    if (draggingItemIndex === null || draggingItemIndex === index) return;
    const updatedItems = [...items];
    const draggedItem = updatedItems[draggingItemIndex];
    updatedItems.splice(draggingItemIndex, 1);
    updatedItems.splice(index, 0, draggedItem);
    setDraggingItemIndex(index);
    setItems(updatedItems);
    setUpdatedList(updatedItems);
  };

  const handleDrop = () => {
    setDraggingItemIndex(null);
  };
  useEffect(() => {
    if(updatedList?.length>0){
      setItems(updatedList);
    setUpdatedList(updatedList);

    }
    else{
      const result = columnsWithAccess
        ?.map((item: any, index: number) => {
          return {
            field: item?.field,
            headerName: item?.translation || item?.headerName,
            id: index + 1,
          };
        });
      setItems(result);
      setUpdatedList(result);
    }
  }, [updatedList]);

  return (
    <>
      <div className="new-additional-pref-column new-order-sorting-list additional-preference-column">
        <div className="additional-filter-box additional-preference-box">
          <div className="additionalFilterScroller filter-scroller">
            {items?.map((item: any, index: number) => (
              <div
                key={item.id}
                style={{ display: ["CurrencyCode", "TransactionType"]?.includes(item?.field) ? 'none' : 'flex' }}
                className={`list-item ${
                  draggingItemIndex === index ? 'dragging' : ''
                }`}
                draggable={["default","DAS Lite"].includes(selectedList)?false:true}
                onDragStart={() => handleDragStart(index)}
                onDragOver={e => {
                  e.preventDefault();
                  handleDragOver(index);
                }}
                onDrop={handleDrop}
                //style={{display:"flex",gap:"8px",alignItems:"center",height:"2rem"}}
              >
                <div className="ddd"
                style={{height:"1.3rem"}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 393 511.528"
                  >
                    <path d="M59.096 0c32.639 0 59.098 26.459 59.098 59.096 0 32.638-26.459 59.098-59.098 59.098C26.459 118.194 0 91.734 0 59.096 0 26.459 26.459 0 59.096 0zm274.808 393.335c32.637 0 59.096 26.459 59.096 59.097 0 32.637-26.459 59.096-59.096 59.096-32.638 0-59.097-26.459-59.097-59.096 0-32.638 26.459-59.097 59.097-59.097zm-274.808 0c32.639 0 59.098 26.459 59.098 59.097 0 32.637-26.459 59.096-59.098 59.096C26.459 511.528 0 485.069 0 452.432c0-32.638 26.459-59.097 59.096-59.097zm274.808-196.668c32.637 0 59.096 26.459 59.096 59.096 0 32.639-26.459 59.098-59.096 59.098-32.638 0-59.097-26.459-59.097-59.098 0-32.637 26.459-59.096 59.097-59.096zm-274.808 0c32.639 0 59.098 26.459 59.098 59.096 0 32.639-26.459 59.098-59.098 59.098C26.459 314.861 0 288.402 0 255.763c0-32.637 26.459-59.096 59.096-59.096zM333.904 0C366.541 0 393 26.459 393 59.096c0 32.638-26.459 59.098-59.096 59.098-32.638 0-59.097-26.46-59.097-59.098C274.807 26.459 301.266 0 333.904 0z" />
                  </svg>
                </div>
                  <div
                  className="preference-checkbox">
                  <Checkbox 
                  checked={!unChecked || !unChecked?.includes(item.field)}
                  disabled={["default","DAS Lite"].includes(selectedList)}
                  

                    onChange={(e)=>{
                      if(e.target.checked){
                          setUnChecked(unChecked.filter((i:any)=>i !== item.field));
                        }else{
                            if(unChecked?.length>0){
                                setUnChecked((prev:any)=>[...prev,item.field]);
                            }else{
                                setUnChecked([item.field]);
                            }
                      }
                    }}>
                    </Checkbox>
                    </div>
                <span>{t(item.headerName)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="filter-footer sorting-footer">
        <Button
          className="Apply-filter"
          //disabled={selectedList==="default"}
          onClick={() => {
            const order = items?.filter((item:any)=>!unChecked?.includes(item.field))?.map((item: any) => {
              return item.field;
            });
            const newList = ["action",...order];
            setOrder(newList);
            onApply({order:newList,unChecked, updatedList:items});
          }}
        >
          <Done /> {t('Filter.button.Apply')}
        </Button>
      </div> */}
    </>
  );
};

export default PreferenceList;
