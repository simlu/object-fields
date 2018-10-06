const expect = require('chai').expect;
const index = require('../src/index');


describe('Testing index.', () => {
  describe('Testing split.', () => {
    it('Testing de-duplication (split).', () => {
      expect(index.split("data,data")).to.deep.equal(["data"]);
    });

    it('Testing simple expand.', () => {
      expect(index.split("data(file1,file2)")).to.deep.equal(["data.file1", "data.file2"]);
    });

    it('Testing nested expand.', () => {
      expect(index.split("data(file1,folder1(file2,file3))")).to.deep.equal([
        "data.file1",
        "data.folder1.file2",
        "data.folder1.file3"
      ]);
    });

    it('Testing incomplete bracket.', () => {
      expect(index.split("data(file1,file2")).to.deep.equal([
        "data(file1",
        "file2"
      ]);
    });
  });

  describe('Testing join.', () => {
    it('Testing de-duplication (join).', () => {
      expect(index.join(["data", "data"])).to.deep.equal("data");
      expect(index.join(["path.to.thing", "path.to.other.thing"]))
        .to.deep.equal("path.to(thing,other.thing)");
    });
  });

  describe('Testing getParents', () => {
    it('Testing basic', () => {
      expect(index.getParents(["child", "", "parent.child", "grandparent.parent.child"]))
        .to.deep.equal(['parent', 'grandparent', 'grandparent.parent']);
    });

    it('Testing de-duplication', () => {
      expect(index.getParents(["grandparent.parent.child", "grandparent.parent.child"]))
        .to.deep.equal(['grandparent', 'grandparent.parent']);
    });
  });
});
