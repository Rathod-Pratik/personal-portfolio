#include<iostream>
using namespace std;
class myclass{
	int a;
	public:
		void display(){
			cout<<"Value of A is :"<<a <<endl;
		}
		myclass(int A){
			cout<<"Enter value of A"<<endl;
	         cin>>A;
	         a=A;
		}
		void operator -(){
			a++;
		}
};
int main(){
	myclass a(15);
	a.display();
	-a;
	a.display();
}
