#include<iostream>
using namespace std;

class myclass1{
	public:
	virtual void print(){
			cout<<"base print function"<<endl;
		}
		void display(){
			cout<<"base display function"<<endl;
		}
};

class myclass2:public myclass1{
	public:
		void print(){
			cout<<"derived print function"<<endl;
		}
		void display(){
			cout<<"derived display function"<<endl;
		}
};

int main(){
	myclass1* bptr;
    myclass2 d;
    bptr = &d;
 
    // Virtual function, binded at runtime
    bptr->print();
 
    // Non-virtual function, binded at compile time
    bptr->display();
	
}
