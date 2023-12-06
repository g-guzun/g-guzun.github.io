public static int mystery3(int[] list, int pos) {
    if (pos == list.length-1) {
        return list[pos];
    }
    else {
        int rest = mystery3(list, pos+1);
        if (list[pos] < rest) {
            return list[pos];
        }
        else {
            return rest;
        }
    }
}
