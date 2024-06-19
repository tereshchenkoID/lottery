export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
      }
    
      if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
      }
    
      const clonedObj = {};
      for (const key in obj) {
        clonedObj[key] = deepClone(obj[key]);
      }
    
      return clonedObj;
}