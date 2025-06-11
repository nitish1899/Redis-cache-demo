export const getFakeDataFromDB = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                users: ['Alice', 'Bob', 'Charlie'],
                timestamp: new Date().toISOString()
            });
        }, 2000); // Simulate 2s DB delay
    });
};
