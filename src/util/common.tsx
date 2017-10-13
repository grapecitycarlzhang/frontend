
export class ToDoCommon {
    /**
     * 获取静态资源地址
     * @param imgUrl 图片地址
     */
    static GetStaticImage(imgUrl: string) {
        if (!imgUrl) {
            return require("../style/image/default.jpg");
        }
        return imgUrl.startsWith("http") || imgUrl.startsWith("data:") ? imgUrl : `${process.env.CDN}${imgUrl}`;
    }

}
