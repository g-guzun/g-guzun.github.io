public static int linearSearch(int[] list, int key, int head) {
    if (key == list[head]) {
        return head;
    }
    if (key != list[head]) {
        return -1;
    }
    return linearSearch(list, key, head+1);
}

