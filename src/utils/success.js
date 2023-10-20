exports.successResponse = ({ message, data, meta = {}, code = 200 }) => {
  if (Array.isArray(data) && data.length !== 0) {
    if (message) {
      return { code, message, data, meta };
    } else {
      return { code, data, meta };
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
