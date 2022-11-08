import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KitchenTicket from "../components/KitchenTicket";
import { editIsDone, getHolder, putHolder } from "../services/Order.Service";

export default function KitchenPage() {
  const holdersInitialState = {
    New: [],
    First: [],
    Second: [],
    Done: [],
  };
  const [holders, setHolders] = useState(holdersInitialState);
  const [holderHeight, setHolderHeight] = useState(true);

  // we save the previous state, in case the API update request fails
  const prevHoldersRef = useRef();

  const [before, setbefore] = useState(holders.New.length);
  const [after, setAfter] = useState();
  const audio = new Audio("/mixkit-retro-game-notification-212.wav");

  // when a new order is received in the kitchen, play a sound
  if (before > after) {
    audio.play(before, after);
  }
  const ding = (val) => {
    setbefore(val);
    setTimeout(() => {
      setAfter(val);
    }, 1000);
  };

  // update the holders and run the function Dings
  const refreshHolders = () => {
    getHolder()
      .then((res) => {
        const { New, First, Second, Done } = res[0];
        setHolders({ New, First, Second, Done });
        ding(New.length);
      })
      .catch((err) => console.log(err));
  };

  // during the DnD, if the API update request fails, restore the previous position.
  useEffect(() => {
    if (prevHoldersRef.current) {
      putHolder(holders)
        .then(() => {})
        .catch(() => setHolders(prevHoldersRef.current));
    }
  }, [holders]);

  // every x seconds update the holders
  useEffect(() => {
    refreshHolders();
    const interval = setInterval(() => {
      refreshHolders();
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cross the item on the order when click on it & update the holders
  const clickCrossItem = (itemId, orderId) => {
    editIsDone(orderId, { itemId })
      .then(() => {
        refreshHolders();
      })
      .catch((err) => console.log(err));
  };

  // DnD function, move the objects and store the change in the DB
  const onDragEnd = (result, holders, setHolders) => {
    if (!result.destination) return;
    const { source, destination } = result;

    //if drag in other holders
    if (source.droppableId !== destination.droppableId) {
      const sourceHolder = holders[source.droppableId];
      const destHolder = holders[destination.droppableId];
      const sourceItems = [...sourceHolder];
      const destItems = [...destHolder];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      prevHoldersRef.current = holders;
      setHolders({
        ...holders,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    } else {
      //if drag in the same position,same holder
      const holder = holders[source.droppableId];
      const copiedItems = [...holder];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      prevHoldersRef.current = holders;
      setHolders({ ...holders, [source.droppableId]: copiedItems });
    }
  };

  return (
    <div className="kitchenPageMain">
      <div className="kitchenPageTop">
        <h1 className="center">Kitchen Wall</h1>
        <i
          className="fa-solid fa-up-right-and-down-left-from-center topBtnStyle topRightPosition"
          onClick={() => setHolderHeight(!holderHeight)}
        ></i>
      </div>
      <div className="kitchenPageBody">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, holders, setHolders)}
        >
          {Object.entries(holders).map(([holderTitle, orderArr]) => {
            return (
              <div
                key={holderTitle}
                className="holderContainer"
                style={{ height: holderHeight ? "25%" : "auto" }}
              >
                <Droppable
                  isDropDisabled={holderTitle === "New" ? true : false}
                  droppableId={holderTitle}
                  direction="horizontal"
                >
                  {(provided, snapshot) => {
                    return (
                      <>
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="holder"
                          style={{
                            background: snapshot.isDraggingOver
                              ? "rgba(255, 0, 255, 0.1)"
                              : "",
                          }}
                        >
                          <div className="holderTitleDiv">
                            <p className="holderTitle">{holderTitle}</p>
                          </div>

                          <div className="holderBody">
                            {orderArr.map((ticket, index) => {
                              return (
                                <Draggable
                                  key={String(ticket._id)}
                                  draggableId={String(ticket._id)}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className="holdTikDiv"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          backgroundColor: snapshot.isDragging
                                            ? "rgba(255,255,0,1)"
                                            : "",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <KitchenTicket
                                          order={ticket}
                                          clickCrossItem={clickCrossItem}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        </div>
                      </>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
