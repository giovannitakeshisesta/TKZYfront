import React from "react";
import TakeOrderItem from "./TakeOrderItem";
import tableIcon from '../assets/table.jpg'
import {toTitle} from '../functions/misc.functions'

const TakeOrderList = ({
  list,
  order,
  functions,
  setmodal,
  selectedAllergens,
}) => {
  const { clickPeople, clickUrgentAway } = functions;

  return (
    <div className="takeOrderListMain">
      <div className="takeOrderListHeader">
        <i
          className="fas fa-exclamation-circle "
          onClick={() => clickUrgentAway("urgent")}
        />
        <div className="frcc">
          <img src={tableIcon} className="tableIcon" alt="tableIcon" />
          <p>{order[0]?.table}</p>
        </div>

        <i
          className="fa-solid fa-pepper-hot"
          onClick={() => setmodal({name:"allergens", prefilledAllergens: selectedAllergens})}

          style={{color: selectedAllergens.length>0 ? "red" : "green"}}
        />

        <div>
          <i className="fas fa-users "></i>
          <input
            className="peopleInput"
            type="number"
            min={0}
            // name="people"
            value={String(order[0]?.people)}
            onChange={clickPeople}
          />
        </div>

        <i
          className="fas fa-bicycle"
          onClick={() => clickUrgentAway("takeAway")}
        />
      </div>

      <div className="takeOrderListBody">
      {list &&
        Object.entries(list).map((el, index) => {
          return (
            <div  key={index}>
              <h4 className="ms-2 mt-2">{toTitle(el[0])}</h4>
              {el[1].item.map((item) => {
                if (
                  !item.allergens.some((r) => selectedAllergens.indexOf(r) >= 0)
                ) {
                  return (
                    <div key={item._id}>
                      <TakeOrderItem
                        item={item}
                        order={order}
                        functions={functions}
                      />
                    </div>
                  );
                } else { return null }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TakeOrderList;
