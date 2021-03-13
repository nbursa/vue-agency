export const statusFromNumber = (num) => {
    let status = ''
    switch(num) {
        case 0:
            status = 'Awaiting'
            break;
        case 1:
            status = 'Accepted'
            break;
        default:
            status = ''
    }
    return status
}