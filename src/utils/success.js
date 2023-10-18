exports.successResponse = ({ message, data, code = 200 }) => {
  if (Array.isArray(data) && data.length !== 0) {
    if (message) {
      return { code, message, data, total: data.length };
    } else {
      return { code, data, total: data.length };
    }
  } else if (typeof data === "object" && data !== null) {
    if (message) {
      return { code, message, data };
    } else {
      return { data, code };
    }
  } else {
    // Handle other data types here if needed
    return { code, message };
  }
};
