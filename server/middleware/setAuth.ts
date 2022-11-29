import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
    export default defineEventHandler(async (event) => {
        console.log("run");
        const cookie:any = getCookie(event, "altine");
        console.log('y/n',(event.req.url === "/api/dashboard/get-posts"))
        if (event.req.url?.includes("/api/")) {
        jwt.verify(cookie, config.JWT_SECRET, async (err:any, decoded:any) => {
            if (err) {
                console.log("err");
                deleteCookie(event, "altine");
                return "False";
            } else {
                console.log("decoded", decoded);
                await useStorage().setItem("user", decoded.id);
                return decoded;
            }
          }
        )
      }
    },
  );