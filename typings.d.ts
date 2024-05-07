type LinkProps = {
  Id: number;
  CardId: number | undefined;
  Title: string;
  Url: string;
}

type ClusterProps = {
  Id: number | undefined;
  Collection: string;
  Category: string;
  Title: string;
  Url: string;
  Description: string;
  Detail: string;
  links: LinkProps[];
}

type EditProps = {
  type: 'ADD' | 'MODIFY';
  cluster: ClusterProps;
};
