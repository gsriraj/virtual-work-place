
export class Util {
    public static isSet(fn: Function, dv: any) {
        try {
            if (fn()) {
                return fn()
            } else {
                return dv
            }
        } catch (e) {
            return dv
        }
    }
}