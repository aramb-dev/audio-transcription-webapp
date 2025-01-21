export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  export const withTimeout = (promise, ms) => {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${ms}ms`));
      }, ms);
    });
  
    return Promise.race([promise, timeout]);
  };
  
  export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
    let lastError;
  
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }
  
    throw lastError;
  };