void swap(node *a,node *b){
    int temp=a->data;
    a->data=b->data;
    b->data=temp;
}