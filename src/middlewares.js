// 유저가 인증된 유저인지 아닌지 보기위한 함수.
export const isAuthenticated = ( request ) => {
    if (!request.user) {
        throw Error("YOU need to login to perform this action")
    }
}