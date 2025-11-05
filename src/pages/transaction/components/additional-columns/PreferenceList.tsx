// import { Done } from "@mui/icons-material";
// import { Button } from "@mui/material";
import { Switch } from "@mui/material";
import { Checkbox } from "antd";
import IosSwitch from "components/layout-switcher/IosSwitch";
import { MoveSvgIcon } from "components/svg-icons/SvgIcons";
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
                style={{ display: ["CurrencyCode", "TransactionType"]?.includes(item?.field) ? 'none' : 'flex', justifyContent:'space-between', padding:'5px 0' }}
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
                <div className="moving-column-preference"
                style={{display:'flex', alignItems:'center', gap:'10px'}}
                >
                  <MoveSvgIcon  className="move-svg-icon" style={{position:'relative', top:'2px'}}/>
                <span>{t(item.headerName)}</span>
                </div>
                  <div
                  className="preference-checkbox">
                  <IosSwitch
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
                    </IosSwitch>
                    </div>
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
