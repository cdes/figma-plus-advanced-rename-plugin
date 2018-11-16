import isEmpty from "lodash.isempty";

export const doubleClickEvent = new MouseEvent("dblclick", {
  view: window,
  button: 0,
  bubbles: true,
  cancelable: true
});

export const sortLayerByListPosition = (a,b) => {
  if (a.position < b.position)
      return -1;
  if (a.position > b.position)
      return 1;
  return 0;
}

export const isObjectEmpty = (obj) => {
  Object.keys(obj).length === 0 && obj.constructor === Object
}

export const getSelectedLayers = () => {
        
  /*
  Figma does not provide all layer properties when accessed via sceneGraph.get(key)
  We can get more properties by using other means.
  */
  
  const { App } = window;
  
  const sceneGraphSelection = App._state.mirror.sceneGraphSelection;    
  
  if(isEmpty(sceneGraphSelection)) {
      //nothing is selected
      return [];
  }
  
  const selectionIds = Object.keys(sceneGraphSelection);
  const pagesList = App._state.mirror.appModel.pagesList;
  const bounds = App.sendMessage("getBoundsForNodes",{nodeIds: selectionIds}).args;
  
  // here we will store our selected layers info
  let layers = [];
  
  //loop through each layer and cache its properties
  selectionIds.map(id => {
                  
      //get a copy of its properties
      const sceneGraph = App._state.mirror.sceneGraph.get(id);
      const parentSceneGraph = App._state.mirror.sceneGraph.get(sceneGraph.parent);
      const currentPageId = App._state.mirror.appModel.currentPage;
      const currentPageName = pagesList[currentPageId];
      
      //cache them
      layers.push({
          id: id,
          name: sceneGraph.name,
          width: bounds[id].width,
          height: bounds[id].height,
          position: sceneGraph.position,
          pageName: currentPageName,
          parentName: parentSceneGraph.name,
          x: bounds[id].x,
          y: bounds[id].y,
          type: sceneGraph.type
      });
      
  });
  
  //make sure that the layers array is sorted the same as Figma's layers list
  layers.sort(sortLayerByListPosition);
  layers = layers.reverse();
  
  return layers;
}

export const renameLayer = (layerId, newName) => {
  App.sendMessage('setNodeProperty', {
      nodeId: layerId,
      property: 'name',
      value: newName
  });
}

export const toast = (message) => {
  App._store.dispatch({
    type: "VISUAL_BELL_ENQUEUE",
    payload: {
        message: message || ""
      }
  });
}