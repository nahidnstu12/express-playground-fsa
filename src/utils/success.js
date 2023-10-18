exports.successResponse = ({ message, data, code }) => {
  if (Array.isArray(data) && data.length !== 0) {
    if (message) {
      return { message, data, total: data.length, code };
    } else {
      return { data, total: data.length, code };
    }
  } else if (typeof data === "object" && data !== null) {
    if (message) {
      return { message, data, code };
    } else {
      return { data, code };
    }
  } else {
    // Handle other data types here if needed
    return { message, code };
  }
};
