export interface DbCrudType {
         idx?: number;
       title?: string;
     content?: string;
    username?: string;
    datetime?: string;
         hit?: number;
}

// 용도에 맞게 타입을 모두 만들어줘야 하는게 맞으나
// 자바 스프링의 DTO같은 역할을 하기 위함으로 모든 필드를 Optional(?) 로 적용