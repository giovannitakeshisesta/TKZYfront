import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createPortal } from 'react-dom';

// fix the react DND bug
const useDraggableInPortal = () => {
  const self = useRef({}).current;

  useEffect(() => {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.pointerEvents = 'none';
      div.style.top = '0';
      div.style.width = '100%';
      div.style.height = '100%';
      self.elt = div;
      document.body.appendChild(div);
      return () => {
          document.body.removeChild(div);
      };
  }, [self]);

  return (render) => (provided, ...args) => {
      const element = render(provided, ...args);
      if (provided.draggableProps.style.position === 'fixed') {
          return createPortal(element, self.elt);
      }
      return element;
  };
};

export default function DNDsingle({ openDetails, list, updateApi, name }) {
  const [renderedList, setRenderedList] = useState();
  const previousState = useRef();
  const renderDraggable = useDraggableInPortal();

  useEffect(() => {
    setRenderedList(list);
  }, [list]);

  function handleOnDragEnd(result) {
    const { source, destination } = result;
    //if drop out of a droppable area => dont do anything
    if (!destination) return;

    // if drop at the same index   => dont do anything
    if (source.index === destination.index) return;

    // we save the previous state, in case the API update request fails
    previousState.current = renderedList;

    // update the DNDlist  with the new sequence
    const newArr = Array.from(renderedList);
    const [draggedItem] = newArr.splice(source.index, 1);
    newArr.splice(destination.index, 0, draggedItem);
    updateApi(newArr, previousState, name);
  }



  return (
    <>
      {renderedList && (
        <>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="renderedList" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="droppable"
                >
                  {renderedList.map((item, index) => {
                    return (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {renderDraggable((provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item && (
                              <div
                                onClick={() => openDetails(item)}
                                className="itemMain"
                              >
                                <div className="itemInner">
                                  <div className="itemImgDiv">
                                    <img className="itemImg" src={item.image} alt={item.name}/>
                                  </div>
                                  <div className="itemNameDiv">                                
                                    <p>{item.name}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </>
  );
}
