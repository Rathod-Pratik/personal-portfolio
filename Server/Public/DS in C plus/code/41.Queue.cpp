#include<iostream>
using namespace std;
#define n 100
class queue{
    int* arr;
    int front;
    int rear;

    public:
    queue(){
        arr=new int[n];
        front=-1;
        rear=-1;
    }

    void push(int x){
        if(rear==n-1){
            cout<<"Queue overflow"<<endl;
            return;
        }
        rear++;
        arr[rear]=x;

        if(front==-1){
            front++;
        }
    }

    void pop(){
        if(rear==-1 || front>rear){
            cout<<"Queue is empty"<<endl;
        }
        front++;
    }

    void peek(){
        if(rear==-1 || front>rear){
            cout<<"Queue is empty"<<endl;
            return;
        }
        cout<<arr[front]<<endl;

    }

    void empty(){
        if(rear==-1 || front>rear){
            cout<<"Queue is empty"<<endl;
            return;
        }
        else{
            cout<<"Queue is not empty"<<endl;
        }

    }

      void display() {
        if (front == -1) {
            cout << "Queue is empty" << endl;
            return;
        }
        
        cout << "Queue elements are: ";
        for (int i = front; i <= rear; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }


};
int main(){
    queue q;
    q.push(10);
    q.push(20);
    q.push(30);
    q.push(40);
    q.push(50);
    q.push(60);
    q.push(70);

    q.display();

    q.pop();
    q.pop();
    q.pop();


    q.display();

    q.peek();

    q.empty();
}