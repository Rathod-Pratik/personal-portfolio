#include<iostream>
using namespace std;

int func(){
    cout<<"i am function one of derived data type" <<endl;
}
int main(){
    func();
int arr[]={1,2,3,4,5,6,7,8,9,10}; // i am array second of the derived data type 

int *pointer=arr; //i am pointer thired of the derived data type

for(int i=0; i<10; i++){
    cout << pointer[i]<<endl;
}
int raf2=120;
int &rafrence=raf2; //i am Reference fourth of the derived data type
cout << rafrence <<endl;
}