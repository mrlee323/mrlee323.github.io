---
layout: post
title: "[자료구조] Linked List"
data: '2021-06-30'
category: [Algorithm]
---

- 연결 리스트
- 배열을 순차적으로 연결된 공간에 데이터를 나열하는 데이터 구조
- 링크드 리스트는 떨어진 곳에 존재하는 데이터를 화살표로 연결해서 관리하는 데이터 구조

### 링크드 리스트 기본 구조와 용어
- 노드 : 데이터 저장 된위(데이터값, 포인터)로 구성
- 포인터 : 각 노드안에서, 다음이나 이전의 노드와의 연결 정보를 가지고 있는 공간

![linked list](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/1920px-Singly-linked-list.svg.png)

## 링크드 리스트의 장단점

### 장점
- 미리 데이터 공간을 미리 할당하디 않아도 된다

### 단점
- 연결을 위한 별도 데이터 공간이 필요하므로, 저장공간 효율이 좋지 않다.
- 연결 정보를 찾는 시간이 필요하므로 접근 속도가 는다.
- 중간 데이터 삭제시, 앞뒤데이터의 연결을 재구성해야하는 부가적인 작업이 필요하다.


## 배열과 링크드 리스트 차이

- 배열은 메모리를 연속적으로 저장하며 n번째 원소에 접근할때 바로 접근할 수 있다. 하지만 메모리 사용이 비효율적이며, 매열내에 데이터 추가 및 삭제의 시간 복잡도가 O(n) 이다. 

- 연결리스트는 메모리를 효율적으로 사용할 수 있고 삽입,삭제도 효율적으로 할 수 있다. 연결에 필요한 주소공간이 필요하며 복잡한 연산으로 인해 오버헤드가 발생하기도한다. 또한 n번째 요소에 접근하기위해서는 링크를 타고 접근해서 비효율적이다. 


## javascript으로 구현한 Linked-list

```js
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(data) {
    this.head = new Node(data)
  }

  insert(data) {
    if (this.head.data === undefined) {
      this.head = new Node(data)
    } else {
      let node = this.head
      while (node.next) node = node.next
      node.next = new Node(data)
    }
  }

  remove(data) {
    if(this.head.data === undefined) return

    if(this.head.data === data) this.head = this.head.next
    else {
      let node = this.head 
      while(node.next) {
        if(node.next.data === data) node.next = node.next.next
        else node = node.next
      }
    }
  }

  find(data) {
    let node = this.head
    while(node) {
      if(node.data === data) return node
      else node = node.next
    }
  }
}
```

간단하게 링크드 리스트를 구현해보았다. 이 클래스는 삽입할때 맨마지막에 넣는것과 노드들이 일방향으로만 연결되어있다. 양방향으로 연결하기위해서는 node에 pre 프로퍼티를 만들어서 앞뒤가 연결되도록 구현해야한다. 또한 삽입할때 민뒤가아닌 앞이나 중간에 하기위해서는 추가 구현이 필요하다
