type LinkProps = {
  Id: number | undefined;
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
